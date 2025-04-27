import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const pool = createClient();
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get('breed');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;
    
    console.log('API received params:', { breed, status, search, limit }); // Add this for debugging
    
    // Build the query with filters
    let query = `
      SELECT 
        s.id, 
        s.name, 
        s.age, 
        s.weight, 
        s.region, 
        s.price, 
        s.available, 
        s.created_at,
        u.name as owner_name
      FROM sheep s
      LEFT JOIN usersss u ON s.owner_id = u.id
      WHERE 1=1
    `;
    
    const queryParams: any[] = [];
    let paramIndex = 1; // Start parameter index at 1 for PostgreSQL
    
    // Add search filter
    if (search) {
      query += ` AND (s.name ILIKE $${paramIndex} OR s.id::text ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }
    
    // Add breed filter
    if (breed && breed !== 'all') {
      query += ` AND (s.name ILIKE $${paramIndex} OR s.name ILIKE $${paramIndex+1})`;
      queryParams.push(`%[${breed}]%`, `%${breed}%`);
      paramIndex += 2;
    }
    
    // Add status filter
    if (status && status !== 'all') {
      if (status === 'active') {
        query += ` AND s.available = true`;
      } else if (status === 'inactive') {
        query += ` AND s.available = false`;
      }
    }
    
    query += ` ORDER BY s.created_at DESC`;
    
    // Add limit if specified
    if (limit) {
      query += ` LIMIT $${paramIndex}`;
      queryParams.push(limit);
    }
    
    console.log('Executing SQL query:', query); // Add this for debugging
    console.log('With parameters:', queryParams); // Add this for debugging
    
    const result = await pool.query(query, queryParams);
    
    // Transform the data to match the expected format in the component
    const sheepData = result.rows.map(sheep => {
      // Extract breed and gender from name
      let breed = extractBreedFromName(sheep.name);
      let gender = determineGender(sheep.name);
      let title = extractTitleFromName(sheep.name);
      
      // Ensure we always have a valid image URL
      const defaultImage = "/placeholder.svg?height=80&width=80";
      
      return {
        id: sheep.id,
        scnId: `SCN-${sheep.id.toString().substring(0, 5)}-MA`,
        title: title || 'Unknown Sheep',
        breed: breed,
        gender: gender,
        age: `${sheep.age} years`,
        weight: `${sheep.weight} kg`,
        price: parseFloat(sheep.price),
        status: sheep.available ? 'active' : 'inactive',
        location: sheep.region || '',
        createdAt: sheep.created_at ? new Date(sheep.created_at).toISOString().split('T')[0] : '',
        image: defaultImage, // Always provide a default image
      };
    });
    
    return NextResponse.json(sheepData);
  } catch (error) {
    console.error('Error fetching sheep:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheep data' },
      { status: 500 }
    );
  }
}

// Helper function to extract breed from name
function extractBreedFromName(name: string | undefined): string {
  if (!name) return 'Unknown';
  
  // Check for structured format [BREED]|GENDER|Title or [BREED]|Title
  const breedMatch = name.match(/\[(.*?)\]/);
  if (breedMatch && breedMatch.length >= 2) {
    return breedMatch[1];
  }
  
  // Fallback: check for known breeds in the name
  const knownBreeds = ["Sardi", "Timahdite", "D'man", "Beni Guil"];
  for (const breed of knownBreeds) {
    if (name.includes(breed)) {
      return breed;
    }
  }
  
  return 'Unknown';
}

// Helper function to determine gender from name
function determineGender(name: string | undefined): string {
  if (!name) return 'Unknown';
  
  // Check for structured format [BREED]|GENDER|Title
  const genderMatch = name.match(/\[.*?\]\|(.*?)\|/);
  if (genderMatch && genderMatch.length >= 2) {
    return genderMatch[1];
  }
  
  if (name.toLowerCase().includes('female') || name.toLowerCase().includes('femelle')) {
    return 'Female';
  }
  
  if (name.toLowerCase().includes('male') || name.toLowerCase().includes('mâle')) {
    return 'Male';
  }
  
  return 'Unknown';
}

// Helper function to extract title from name
function extractTitleFromName(name: string | undefined): string {
  if (!name) return 'Unknown';
  
  // Check for structured format [BREED]|GENDER|Title
  const titleMatch = name.match(/\[.*?\]\|.*?\|(.*)/);
  if (titleMatch && titleMatch.length >= 2) {
    return titleMatch[1];
  }
  
  // Check for structured format [BREED]|Title
  const simpleTitleMatch = name.match(/\[.*?\]\|(.*)/);
  if (simpleTitleMatch && simpleTitleMatch.length >= 2) {
    return simpleTitleMatch[1];
  }
  
  // If no structured format, return the original name
  return name;
}

export async function POST(request: Request) {
  try {
    const pool = createClient();
    const data = await request.json();
    
    console.log('Received data:', data);
    
    // Extract data from the request - handle both formats
    let name, age, weight, region, price, available;
    
    if (data.title !== undefined) {
      // Format from SheepManagement.tsx
      const { title, breed, gender, age: ageValue, weight: weightValue, location, price: priceValue, status } = data;
      
      // Format the name to include breed and gender
      name = `[${breed}]|${gender}|${title}`;
      age = parseFloat(String(ageValue).replace(/[^0-9.]/g, '') || '0');
      weight = parseFloat(String(weightValue).replace(/[^0-9.]/g, '') || '0');
      region = location || '';
      price = typeof priceValue === 'number' ? priceValue : parseFloat(String(priceValue) || '0');
      available = status === 'active';
    } else {
      // Format from SellerDashboard.tsx
      const { name: nameValue, breed, gender, age: ageValue, weight: weightValue, region: regionValue, price: priceValue, available: availableValue } = data;
      
      // Format the name to include breed and gender if not already formatted
      if (nameValue && (nameValue.includes('[') && nameValue.includes(']|'))) {
        name = nameValue; // Already formatted
      } else if (nameValue) {
        name = `[${breed}]|${gender}|${nameValue}`;
      } else {
        // Fallback if name is missing
        name = `[${breed || 'Unknown'}]|${gender || 'Unknown'}|Unnamed Sheep`;
      }
      
      age = parseFloat(String(ageValue).replace(/[^0-9.]/g, '') || '0');
      weight = parseFloat(String(weightValue).replace(/[^0-9.]/g, '') || '0');
      region = regionValue || '';
      price = typeof priceValue === 'number' ? priceValue : parseFloat(String(priceValue) || '0');
      available = availableValue === true || availableValue === 'true';
    }
    
    // Get a valid user ID from the database
    const userResult = await pool.query('SELECT id FROM usersss LIMIT 1');
    const ownerId = userResult.rows.length > 0 ? userResult.rows[0].id : null;
    
    if (!ownerId) {
      throw new Error('No valid owner found in the database');
    }
    
    console.log('Inserting sheep with values:', { ownerId, name, age, weight, region, price, available });
    
    // Insert the new sheep into the database
    const result = await pool.query(
      `INSERT INTO sheep 
       (owner_id, name, age, weight, region, price, available, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [ownerId, name, age, weight, region, price, available]
    );
    
    // Return the newly created sheep
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding sheep:', error);
    return NextResponse.json(
      { 
        error: 'Failed to add sheep', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
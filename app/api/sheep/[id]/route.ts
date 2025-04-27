import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db';

// Add this PUT handler for updating sheep
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const pool = createClient();
    const data = await request.json();
    
    // Extract data from the request
    const { title, breed, gender, age, weight, price, status, location } = data;
    
    // Format the name to include breed and gender information
    // Format: [BREED]|GENDER|Title
    const name = `[${breed}]|${gender}|${title}`;
    
    // Parse age to get the numeric value (e.g., "1.5 years" -> 1.5)
    const ageValue = parseFloat(age.replace(/[^0-9.]/g, '') || '0');
    
    // Parse weight to get the numeric value (e.g., "65 kg" -> 65)
    const weightValue = parseFloat(weight.replace(/[^0-9.]/g, '') || '0');
    
    // Convert status to available boolean
    const available = status === 'active';
    
    // Update the sheep in the database
    const result = await pool.query(
      `UPDATE sheep 
       SET name = $1, age = $2, weight = $3, region = $4, price = $5, available = $6
       WHERE id = $7
       RETURNING *`,
      [name, ageValue, weightValue, location, price, available, id]
    );
    
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Sheep not found' },
        { status: 404 }
      );
    }
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating sheep:', error);
    return NextResponse.json(
      { error: 'Failed to update sheep' },
      { status: 500 }
    );
  }
}

// The existing DELETE handler looks good
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const pool = createClient();
    
    // Delete the sheep record
    const result = await pool.query(
      'DELETE FROM sheep WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Sheep not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sheep:', error);
    return NextResponse.json(
      { error: 'Failed to delete sheep' },
      { status: 500 }
    );
  }
}
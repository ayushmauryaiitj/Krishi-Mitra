
async function test() {
  const payload = {
    tag_number: '23', type: 'Cow', breed: 'desi', age: '5', gender: 'Female', health_status: 'Needs Attention', vaccination_status: 'Up to Date'
  };

  try {
    const res = await fetch('http://localhost:8000/api/v1/livestock/ce6de226-091b-4448-ad73-0d3357f32998', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Backend Save Error:', errorText);
    } else {
      console.log('Success:', await res.json());
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
test();


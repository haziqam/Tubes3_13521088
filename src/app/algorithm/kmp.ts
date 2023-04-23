async function getQnA() {
    const res = await fetch(`http://localhost:3000/api/getQnA`);
    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }
    const data = await res.json();
    return data;
  }
  
  async function fetchData() {
    try {
      const data = await getQnA();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
fetchData();
  
  
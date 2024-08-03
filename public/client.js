async function fetchData() {
    try {
      const response = await fetch('/data');
      const data = await response.json();
      updateDataList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function updateDataList(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = data.map(item => `<li>Name: ${item.name}, Email: ${item.email}, Age: ${item.age}</li>`).join('');
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch('/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
  
      if (response.ok) {
        form.reset();
        fetchData();
      } else {
        console.error('Server error:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.querySelector('form').addEventListener('submit', handleSubmit);
  });
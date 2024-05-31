// import axios from "axios";

const fetchData = async () => {
  try {
    // const response = await axios.get('http://localhost:3000/api/data');
    // console.log("=="+response.data)
    // return response.data;

    const response = await fetch("http://localhost:3000/api/data");
    const jsonData = await response.json();
        console.log("jsonData"+jsonData)

    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;

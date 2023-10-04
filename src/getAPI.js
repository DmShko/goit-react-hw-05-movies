import axios from 'axios';

// const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTlmY2IzMzhkNzQwNWIxMTAzOGE2MDIxZjc5MDY3YSIsInN1YiI6IjY1MWQ3OTI1MmYzYjE3MDBhZTE1OTMzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y_VogkHkdqXyq5bvogiqbG3XVCUoSvYIXizpetdd82M';
const API_KEY = '899fcb338d7405b11038a6021f79067a';

const getDataFromAPI = async(data, settings) => {

    //------------------------------------------------------------------
    // FIRST method, if use 'option': ...axios.get(url, options) and 
    //  let url=`https://api.themoviedb.org/3/${data}/day?language=en-US`
    //  but in this variant only by TOKEN!!! 

    // const options = {
    //     headers: {
    //       Authorization: `Bearer ${API_TOKEN}`
    //     }
    // };
    //------------------------------------------------------------------

    //SECOND method
    let url=`https://api.themoviedb.org/3/${data}?api_key=${API_KEY}&${settings}`
    return await axios.get(url).then(responce => {
      return responce;
    });

}

export default getDataFromAPI;
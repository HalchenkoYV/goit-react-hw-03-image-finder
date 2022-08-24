import axios from "axios";


function fetchPics(text, page) {
  let instance = axios.create();

    instance.defaults = ({
      method: 'get',
      baseURL: 'https://pixabay.com',
      timeout: 3000
    });
    
  const params = {
            q: text,
            page: page,
            key: '21539739-826ad7071a5325d71a1052891',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
  } 
  

  const response = axios.get('',{ params });
  return response;
        
  };

  const api = {
    fetchPics,
  };

export default api;






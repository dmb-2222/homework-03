import axios from "axios";
const restApi = inputSubmit => {
  const CATS_URL =
    "https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=";
  const key = "12916559-bca9cacbc431a253364f58898";
  // https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

  return axios.get(`${CATS_URL}+${inputSubmit}&page=1&per_page=12&key=${key}`);
};
const restApiLoadMore = (nextPage=2,searchValue) => {
  const CATS_URL =
    "https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=";
  const key = "12916559-bca9cacbc431a253364f58898";
  return axios.get(`${CATS_URL}+${searchValue}&page=${nextPage}&per_page=12&key=${key}`);
};

export { restApi, restApiLoadMore };

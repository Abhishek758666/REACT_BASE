const API_BASE_URL = "http://192.168.1.121:8000/v1";
const API_BASE_URL_IMAGE = `http://192.168.1.121:8000/assets`;

const PERSIST_VERSION = 1;
const PERSIST_KEY = "bookMyHub-customer";
const API_EXPIRE_TIME = 5000;
const FFEATURE_FLAGS = {
  newFeature: true,
  experimentalFeature: true,
};
export {
  API_BASE_URL,
  PERSIST_KEY,
  PERSIST_VERSION,
  FFEATURE_FLAGS,
  API_EXPIRE_TIME,
  API_BASE_URL_IMAGE,
};

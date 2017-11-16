export const mapGameIdToName = (id) => {
  switch (id) {
    case 1:
      return "reversi";
    default:
      return "";
  }
}

export const endpointdev = "http://localhost:5000";
export const endpoint = "https://localhost:5000";

export const endPoint = () => {
  if(process.env.NODE_ENV == 'production'){
    return endpoint;
  }else {
    return endpointdev;
  }
}

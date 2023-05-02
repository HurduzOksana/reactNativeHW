import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDsb7F-VyBJn7r4LilYH_lRHBpPfgyUga8");

export const getCity = async (latitude, longitude) => {
  let city = {
    cityName: null,
    country: null,
  };
  try {
    const response = await Geocode.fromLatLng(`${latitude}`, `${longitude}`);

    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (
        let j = 0;
        j < response.results[0].address_components[i].types.length;
        j++
      ) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city.cityName = response.results[0].address_components[i].long_name;
            break;
          case "country":
            city.country = response.results[0].address_components[i].long_name;
            break;
          default:
        }
      }
    }
    return city;
  } catch (error) {
    console.log(error);
  }
  return city;
};

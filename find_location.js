const apiKey = 'f897a99d971b5eef57be6fafa0d83239'
const countryCode = 'US', userInputs = []

/**
 * Takes in an array of city, place and/or zipcode, find the locations and return them.
 * @param Array - cityZipcodeArray: contains "city,place" or "zipcode" or combination of 1 or more "city, place" and "zipcode"
 * @return {Array} - locations found associate with user inputs
 */
async function findLocationBy(cityZipcodeArray) {
  const userOutputs = []
  if (!cityZipcodeArray || cityZipcodeArray.length == 0) {
    const message = 'REQUIRED >>>>>>>>> "city,place", "zipcode" or multiple "city, place" or "zip codes"'
    console.warn(`WARNING: ${message}`)
    userOutputs.push({ status: 404})
    return userOutputs
  }
  for (let index = 0; index < cityZipcodeArray.length; index++) {
    if (cityZipcodeArray[index].match(/\d/)) {
      const response = await searchByZipCode(cityZipcodeArray[index])
      userOutputs.push(response)
    } else {
      const response = await searchByCityPlace(cityZipcodeArray[index])
      userOutputs.push(response)
    }
  }
  return userOutputs
}

// Take in a zipcode to search for location and return it
async function searchByZipCode(value) {
  const zipEndpoint = `http://api.openweathermap.org/geo/1.0/zip?zip=${value},${countryCode}&appid=${apiKey}`
  const response = await fetch(zipEndpoint)
  const data = await response.json()
  // Print out data retrieved
  // console.log('DATA RETRIEVED >>>>>>>> ' +JSON.stringify(data))
  return {
    status: response.status,
    data: data
  }
}

// Take in a city, stateCode to search for location and return it
async function searchByCityPlace(value) {
  const placeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${value},${countryCode}&limit=5&appid=${apiKey}`
  const response = await fetch(placeEndpoint)
  const data = await response.json()
  // Print out data retrieved
  // console.log('DATA RETRIEVED >>>>>>>> ' +JSON.stringify(data[0]))
  return {
    status: response.status,
    data: data[0]
  }
}

module.exports = { findLocationBy, searchByCityPlace, searchByZipCode }
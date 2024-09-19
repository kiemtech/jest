const { searchByCityPlace, searchByZipCode, findLocationBy } = require("./find_location.js")

describe('Find Location by City, StateCode', () => {
    it('@find location by city name only', async () => {
        const cityName = 'Denver'
        const response = await searchByCityPlace(cityName)
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('local_names')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
        expect(response.data).toHaveProperty('state')
        expect(response.data.state.toLowerCase()).toEqual('colorado')
    })

    it('@find location by city and place combination', async () => {
        const cityAndPlace = 'San Mateo, CA'
        const response = await searchByCityPlace(cityAndPlace)
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('local_names')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
        expect(response.data).toHaveProperty('state')
        expect(response.data.state.toLowerCase()).toEqual('california')
    })

    it('@find location by city and place combination and zipcode', async () => {
        const cityAndPlace = ['Westminster, CO', '80234']
        const response = (await findLocationBy(cityAndPlace))[0]
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('local_names')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
        expect(response.data).toHaveProperty('state')
        expect(response.data.state.toLowerCase()).toEqual('colorado')
    })

    it('@find location by multiple cities and places combination', async () => {
        const cityAndPlace = ['San Mateo, CA', 'Westminster, CO']
        const response = (await findLocationBy(cityAndPlace))[0]
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('local_names')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
        expect(response.data).toHaveProperty('state')
        expect(response.data.state.toLowerCase()).toEqual('california')
    })

    it('@find location by multiple zip codes', async () => {
        const zipCode = ['80234', '12345']
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('zip')
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
    })

    it('@find location by zip code only', async () => {
        const zipCode = '80234'
        const response = await searchByZipCode(zipCode)
        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('zip')
        expect(response.data).toHaveProperty('name')
        expect(response.data).toHaveProperty('lat')
        expect(response.data).toHaveProperty('lon')
        expect(response.data).toHaveProperty('country')
        expect(response.data.country.toLowerCase()).toEqual('us')
    })


    it('@find location by invalid zip code', async () => {
        const zipCode = ['802']
        const response = await searchByZipCode(zipCode)
        expect(response.status).toEqual(404)
    })

    it('@find location by invalid city, place', async () => {
        const cityPlace = ''
        const response = await searchByCityPlace(cityPlace)
        expect(response.status).toEqual(404)
    })
})

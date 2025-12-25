import api from './api';

const createResourceService = (endpoint) => ({
    getAll: async () => {
        const response = await api.get(endpoint);
        return response.data;
    },
    getOne: async (id) => {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post(endpoint, data);
        return response.data;
    },
});

export const locationService = createResourceService('/locations');
export const hotelService = createResourceService('/hotels');
export const flightService = createResourceService('/flights');
export const airlineService = createResourceService('/airlines');
export const viewpointService = createResourceService('/viewpoints');

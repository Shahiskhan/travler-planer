import api from './api';

const createResourceService = (endpoint) => ({
    getAll: async (userId = null) => {
        const url = userId ? `${endpoint}?userId=${userId}` : endpoint;
        const response = await api.get(url);
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
    update: async (id, data) => {
        const response = await api.put(`${endpoint}/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`${endpoint}/${id}`);
        return response.data;
    },
});

export const locationService = createResourceService('/locations');
export const hotelService = createResourceService('/hotels');
export const flightService = createResourceService('/flights');
export const airlineService = createResourceService('/airlines');
export const viewpointService = createResourceService('/viewpoints');

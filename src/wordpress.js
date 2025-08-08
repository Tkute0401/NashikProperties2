import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createRootURLMiddleware('https://nashikproperties-server.firefist.co.in/wp-json/'));

// Helper function to process property data
const processPropertyData = (property) => ({
  ...property,
  amenity: property._embedded?.['wp:term']?.find(terms => 
    terms[0]?.taxonomy === 'amenity'
  )?.map(term => term.name) || [],
  location: property._embedded?.['wp:term']?.find(terms => 
    terms[0]?.taxonomy === 'location'
  )?.map(term => term.name) || [],
  propertytype: property._embedded?.['wp:term']?.find(terms => 
    terms[0]?.taxonomy === 'propertytype'
  )?.map(term => term.name) || []
});

// Fetch all properties with filters
export const getProperties = async (params = {}) => {
  try {
    let path = 'wp/v2/posts?_embed&per_page=100';
    
    if (params.search) path += `&search=${encodeURIComponent(params.search)}`;
    if (params.propertyType) path += `&propertytype=${params.propertyType}`;
    if (params.amenity) path += `&amenity=${params.amenity}`;
    if (params.minPrice || params.maxPrice) path += '&acf_format=standard';

    const response = await apiFetch({ path });
    let processed = response.map(processPropertyData);

    if (params.minPrice) {
      processed = processed.filter(p => p.acf?.price >= params.minPrice);
    }
    if (params.maxPrice) {
      processed = processed.filter(p => p.acf?.price <= params.maxPrice);
    }

    return processed;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Fetch single property by ID
export const getPropertyById = async (id) => {
  try {
    const response = await apiFetch({ path: `wp/v2/posts/${id}?_embed` });
    return processPropertyData(response);
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

// Fetch property types
export const getPropertyTypes = async () => {
  try {
    return await apiFetch({ path: 'wp/v2/propertytype?per_page=100' });
  } catch (error) {
    console.error('Error fetching property types:', error);
    return [];
  }
};

// Fetch amenities
export const getAmenities = async () => {
  try {
    return await apiFetch({ path: 'wp/v2/amenity?per_page=100' });
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
};
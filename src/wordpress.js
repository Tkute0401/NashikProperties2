import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createRootURLMiddleware('https://nashikproperties-server.firefist.co.in/wp-json/'));

// Fetch all properties with filters
export const getProperties = async (params = {}) => {
  try {
    let path = 'wp/v2/posts?_embed&per_page=100';
    
    // Add search filter
    if (params.search) {
      path += `&search=${encodeURIComponent(params.search)}`;
    }
    
    // Add property type filter
    if (params.propertyType) {
      path += `&propertytype=${params.propertyType}`;
    }
    
    // Add amenity filter
    if (params.amenity) {
      path += `&amenity=${params.amenity}`;
    }
    
    // Add price range filter
    if (params.minPrice || params.maxPrice) {
      path += '&acf_format=standard';
    }

    const response = await apiFetch({ path });
    
    // Process the response with taxonomy terms
    let processed = response.map(post => ({
      ...post,
      amenity: post._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'amenity'
      )?.map(term => term.name) || [],
      location: post._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'location'
      )?.map(term => term.name) || [],
      propertytype: post._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'propertytype'
      )?.map(term => term.name) || []
    }));

    // Apply price filtering client-side (since WP REST API doesn't support ACF price filtering directly)
    if (params.minPrice) {
      processed = processed.filter(property => property.acf?.price >= params.minPrice);
    }
    if (params.maxPrice) {
      processed = processed.filter(property => property.acf?.price <= params.maxPrice);
    }

    return processed;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Fetch all property types for filter dropdown
export const getPropertyTypes = async () => {
  try {
    const response = await apiFetch({
      path: 'wp/v2/propertytype?per_page=100',
    });
    return response;
  } catch (error) {
    console.error('Error fetching property types:', error);
    return [];
  }
};

// Fetch all amenities for filter dropdown
export const getAmenities = async () => {
  try {
    const response = await apiFetch({
      path: 'wp/v2/amenity?per_page=100',
    });
    return response;
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
};
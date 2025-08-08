import apiFetch from '@wordpress/api-fetch';

// Configure the WordPress REST API endpoint
apiFetch.use(apiFetch.createRootURLMiddleware('https://nashikproperties-server.firefist.co.in/wp-json/'));

// Helper function to fetch properties with embedded terms
export const getProperties = async () => {
  try {
    const response = await apiFetch({
      path: 'wp/v2/posts?_embed&per_page=100',
    });
    
    // Process the response to include taxonomy terms
    return response.map(post => ({
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
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Helper function to fetch a single property by ID with embedded terms
export const getPropertyById = async (id) => {
  try {
    const response = await apiFetch({
      path: `wp/v2/posts/${id}?_embed`,
    });
    
    // Process the response to include taxonomy terms
    return {
      ...response,
      amenity: response._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'amenity'
      )?.map(term => term.name) || [],
      location: response._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'location'
      )?.map(term => term.name) || [],
      propertytype: response._embedded?.['wp:term']?.find(terms => 
        terms[0]?.taxonomy === 'propertytype'
      )?.map(term => term.name) || []
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};
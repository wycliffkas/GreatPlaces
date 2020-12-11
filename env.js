const variables = {
    development: {
        googleApiKey: "AIzaSyAerLbUn1hTDevuSA-c65e4ZBQpaJbTjb4"
    },
    production: {
        googleApiKey: 'xyz'
    }
    
}

const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};

export default getEnvVariables; 
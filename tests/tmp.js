const trowError = (status, msgText) =>{
    throw 'new ApiError(status, msgText);'
} 

const run = () =>{
    trowError();
    console.log('a');
}

run();
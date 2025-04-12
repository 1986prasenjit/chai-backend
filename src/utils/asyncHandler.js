//! This AsyncHandler is nothing but a Higher Order Function, which takes a function as a parameter and returns that function and it is used in the industry so avoid writing try and catch block to handle error

function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next))
           .catch((error) => next(error)
    );
  };
}

export { asyncHandler };

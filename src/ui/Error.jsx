import { useNavigate, useRouteError } from 'react-router';

function NotFound() {
  const navigate = useNavigate();

  // access the error when the route that renders this element occur
  const error = useRouteError() 
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;

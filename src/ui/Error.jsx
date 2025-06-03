import { useRouteError } from 'react-router';
import LinkButton from './LinkButton';

function Error() {
  // access the error when the route that renders this element occur
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;

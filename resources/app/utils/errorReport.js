export default function report(err) {
  /* eslint-disable */
  alert('Sorry, we had a problem whilst processing your request, please refresh the page and try again.');
  if (process.env.NODE_ENV !== 'production') {
    console.log(err);
  } else {
    // TODO add sentry report
  }
}

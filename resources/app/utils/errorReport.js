export default function report(err) {
  this.$message.error({
    message: 'Sorry, we had a problem whilst processing your request, please try again',
    center: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    console.log(err);
  } else {
    // TODO add sentry report
  }
}

import connectDB from 'HOC/connectDB';
import { store } from 'schema';

export default BaseComponent =>
  connectDB({
    schema: store,
  })(BaseComponent);

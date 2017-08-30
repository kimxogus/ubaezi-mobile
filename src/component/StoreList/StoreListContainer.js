import connectDB from 'HOC/connectDB';

export default BaseComponent => connectDB()(BaseComponent);

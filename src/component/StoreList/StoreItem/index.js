import StoreItem from './StoreItem';
import StoreItemContainer from './StoreItemContainer';

const Component = StoreItemContainer(StoreItem);
Component.height = StoreItem.height;

export default Component;

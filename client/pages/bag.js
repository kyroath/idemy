import Navbar from '../src/Navbar';
import BagComponent from '../src/components/BagComponent';

export default function Bag() {
  return (
    <>
    <Navbar text = "BAG" showMenu = "true" showSearch = "false"/>
    <BagComponent></BagComponent>
    </>
  );
}
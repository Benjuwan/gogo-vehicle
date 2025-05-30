import { TheDrawer } from "./components/TheDrawer";

export const App = () => {
  return (
    <>
      <h1 className="text-center text-xl leading-[2em] tracking-[0.15em] py-8">GoGo Vehicle<span className="block text-xs mt-.5em">幼児向け乗り物お絵かきアプリ</span></h1>
      <TheDrawer />
    </>
  );
}
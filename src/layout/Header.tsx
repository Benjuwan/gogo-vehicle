import logo from "../../public/logo.svg";

export const Header = () => {
    return (
        <header className="flex gap-[1em] justify-between items-center w-fit m-auto">
            <figure><img className="w-full max-w-[5rem]" src={logo} alt="ロゴ" /></figure>
            <h1 className="text-xl leading-[2em] tracking-[0.15em] py-8">GoGo Vehicle<span className="block text-xs mt-.5em">幼児向け乗り物お絵かきアプリ</span></h1>
        </header>
    );
}
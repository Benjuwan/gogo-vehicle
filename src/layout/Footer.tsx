import { useMemo } from "react";

export const Footer = () => {
    const currYear: number = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer>
            <p className="text-xs text-center"><small>Copyright &copy; {currYear} GoGo Vehicle | benjuwan</small></p>
        </footer>
    );
}
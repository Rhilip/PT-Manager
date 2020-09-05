import Application from "@/userscript/application";

export default function (): Application {
    return (window as any)['__PT_MANAGER__']
}
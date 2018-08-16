import { Position, Toaster, Intent } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
export const AppToast = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});
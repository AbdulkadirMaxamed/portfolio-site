export type WindowId = string;

export type WindowAnimationState = "opening" | "open" | "closing" | "minimizing" | "restoring";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  isMinimized: boolean;
  animationState: WindowAnimationState;
  contentType: string;
}

export interface WindowManagerState {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  nextZIndex: number;
}

export type WindowManagerAction =
  | { type: "OPEN_WINDOW"; payload: { id: WindowId; title: string; icon: string; contentType: string; size?: Partial<WindowSize> } }
  | { type: "CLOSE_WINDOW"; payload: { id: WindowId } }
  | { type: "REMOVE_WINDOW"; payload: { id: WindowId } }
  | { type: "FOCUS_WINDOW"; payload: { id: WindowId } }
  | { type: "MINIMIZE_WINDOW"; payload: { id: WindowId } }
  | { type: "RESTORE_WINDOW"; payload: { id: WindowId } }
  | { type: "SET_ANIMATION_STATE"; payload: { id: WindowId; animationState: WindowAnimationState } }
  | { type: "MOVE_WINDOW"; payload: { id: WindowId; position: WindowPosition } }
  | { type: "CLOSE_ACTIVE_WINDOW" };

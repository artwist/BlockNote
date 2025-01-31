import { offset, useFloating, useTransitionStyles } from "@floating-ui/react";
import { useEffect, useMemo } from "react";

import { UiComponentPosition } from "../../../hooks/UiComponentPosition";

function getBoundingClientRectRow(
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: "row" | "col";
    mousePos: number;
  }
) {
  if (draggingState && draggingState.draggedCellOrientation === "row") {
    return new DOMRect(
      referencePosTable!.x,
      draggingState.mousePos,
      referencePosTable!.width,
      0
    );
  }

  return new DOMRect(
    referencePosTable!.x,
    referencePosCell!.y,
    referencePosTable!.width,
    referencePosCell!.height
  );
}

function getBoundingClientRectCol(
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: "row" | "col";
    mousePos: number;
  }
) {
  if (draggingState && draggingState.draggedCellOrientation === "col") {
    return new DOMRect(
      draggingState.mousePos,
      referencePosTable!.y,
      0,
      referencePosTable!.height
    );
  }

  return new DOMRect(
    referencePosCell!.x,
    referencePosTable!.y,
    referencePosCell!.width,
    referencePosTable!.height
  );
}

function useTableHandlePosition(
  orientation: "row" | "col",
  show: boolean,
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: "row" | "col";
    mousePos: number;
  }
): UiComponentPosition {
  const { refs, update, context, floatingStyles } = useFloating({
    open: show,
    placement: orientation === "row" ? "left" : "top",
    middleware: [offset(orientation === "row" ? -10 : -12)],
  });

  const { isMounted, styles } = useTransitionStyles(context);

  useEffect(() => {
    update();
  }, [referencePosCell, referencePosTable, update]);

  useEffect(() => {
    // TODO: Maybe throw error instead if null
    if (referencePosCell === null || referencePosTable === null) {
      return;
    }

    refs.setReference({
      getBoundingClientRect: () => {
        const fn =
          orientation === "row"
            ? getBoundingClientRectRow
            : getBoundingClientRectCol;
        return fn(referencePosCell, referencePosTable, draggingState);
      },
    });
  }, [draggingState, orientation, referencePosCell, referencePosTable, refs]);

  return useMemo(
    () => ({
      isMounted: isMounted,
      ref: refs.setFloating,
      style: {
        display: "flex",
        ...styles,
        ...floatingStyles,
        zIndex: 10000,
      },
    }),
    [floatingStyles, isMounted, refs.setFloating, styles]
  );
}

export function useTableHandlesPositioning(
  show: boolean,
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: "row" | "col";
    mousePos: number;
  }
): {
  rowHandle: UiComponentPosition;
  colHandle: UiComponentPosition;
} {
  const rowHandle = useTableHandlePosition(
    "row",
    show,
    referencePosCell,
    referencePosTable,
    draggingState
  );
  const colHandle = useTableHandlePosition(
    "col",
    show,
    referencePosCell,
    referencePosTable,
    draggingState
  );

  return useMemo(
    () => ({
      rowHandle,
      colHandle,
    }),
    [colHandle, rowHandle]
  );
}

/**********************************************************************
|| Cloud Web OS – Interaction Utilities
**********************************************************************/

// Hàm tiện ích để tạo drag system
function useDrag(element, options) {
  if (!element) return null;
  return new DragSystem(element, options);
}

// Hàm tiện ích để tạo resize system
function useResize(element, options) {
  if (!element) return null;
  return new ResizeSystem(element, options);
}

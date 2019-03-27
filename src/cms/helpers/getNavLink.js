export default function getNavLink(selectedElement, elementId, routeArray) {
  if (selectedElement === elementId) {
    const targetRoute = routeArray.slice(0, -1);
    return targetRoute;
  } else {
    return [...routeArray, elementId];
  }
}

// Render Wrapper support (for client integrations such as react-router or redux)
export const renderWrappers = []

const withWrapper = (child, options, wrapper) => wrapper(child, options)

export const withWrappers = (child, options, wrappers = renderWrappers) => (
  wrappers.reduce(
    (wrappedChild, wrapper) => (
      withWrapper(wrappedChild, options, wrapper)), child))

export const renderer = wrapper => renderWrappers.push(wrapper)


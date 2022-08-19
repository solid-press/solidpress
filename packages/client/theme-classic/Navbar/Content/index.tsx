import NavbarContentLayout from './Layout'

export default function() {
  return (
    <NavbarContentLayout 
      left={
        <>
          Logo
        </>
      }
      right={
        <>
          Items
        </>
      }
    />
  )
}
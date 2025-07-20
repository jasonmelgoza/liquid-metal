"use client"

import { system } from "@/components/theme"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode"
import { ChakraProvider } from "@chakra-ui/react"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}

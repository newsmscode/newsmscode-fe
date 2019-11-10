import React from 'react'
import NextLink from 'next/link'

import { inject, observer } from 'mobx-react'

export const Link = inject('store')(
  observer(({
    children,
    href,
    store: {
      app
    },
    ...props
  }) => (
    <NextLink
      href={href}
      as={`/${app.locale}${href}`}
      { ...props }
    >{children}</NextLink>
  ))
)


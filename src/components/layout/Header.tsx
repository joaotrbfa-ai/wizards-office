'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '@/lib/nav'
import { EASE_SOFT, menuOverlay } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500 ease-soft',
          scrolled
            ? 'border-b border-cream/10 bg-olive/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex w-full max-w-wrap items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 xl:px-16">
          <Link
            href="/"
            aria-label="wzds. — Wizards Office"
            className="block transition-opacity hover:opacity-80"
          >
            <Image
              src="/brand/logo-light.png"
              alt="wzds."
              width={1250}
              height={404}
              priority
              className="h-7 w-auto sm:h-9"
            />
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[0.72rem] uppercase tracking-widest">
              {NAV_ITEMS.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative inline-block py-1 transition-colors duration-300',
                        active ? 'text-cream' : 'text-cream/85 hover:text-cream',
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-cream transition-transform duration-500 ease-soft',
                          active && 'scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden className="relative block h-3 w-7">
              <span
                className={cn(
                  'absolute left-0 top-0 h-px w-full bg-cream transition-transform duration-500 ease-soft',
                  open && 'translate-y-1.5 rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-px w-full bg-cream transition-transform duration-500 ease-soft',
                  open && '-translate-y-1.5 -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            variants={menuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 flex flex-col bg-olive md:hidden"
          >
            <div className="flex-1 overflow-y-auto px-5 pb-12 pt-28 sm:px-8">
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item, i) => {
                    const active =
                      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.1 + i * 0.05, duration: 0.6, ease: EASE_SOFT },
                        }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'block border-b border-cream/15 py-5 font-sans text-3xl uppercase tracking-wider transition-colors sm:text-4xl',
                            active ? 'text-cream' : 'text-cream/80 hover:text-cream',
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

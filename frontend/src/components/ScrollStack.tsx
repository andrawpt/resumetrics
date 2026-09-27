import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  floatDelay?: string;
  floatDuration?: string;
  floatAmplitude?: string;
  floatRotate?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  floatDelay = '0s',
  floatDuration = '4.5s',
  floatAmplitude = '7px',
  floatRotate = '0.4deg'
}) => (
  <div className="scroll-stack-card-wrapper">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>
      <div
        className="scroll-stack-card-float"
        style={{
          ['--float-delay' as any]: floatDelay,
          ['--float-dur' as any]: floatDuration,
          ['--float-y' as any]: floatAmplitude,
          ['--float-rotate' as any]: floatRotate,
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

interface ScrollStackProps {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  headerPosition?: string | number;
  stackPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  className = '',
  header,
  children,
  itemDistance = 200,
  itemScale = 0.05,
  itemStackDistance = 14,
  headerPosition = 'center',
  stackPosition = 'center',
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);

  const headerTopRef = useRef<number>(0);
  const stableHeaderHeightRef = useRef<number>(120);
  const stableCardHeightRef = useRef<number>(300);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
      };
    }
  }, [useWindowScroll]);

  const measurePositions = useCallback(() => {
    const containerHeight = useWindowScroll ? window.innerHeight : (scrollerRef.current?.clientHeight || window.innerHeight);

    if (headerWrapperRef.current) {
      stableHeaderHeightRef.current = headerWrapperRef.current.offsetHeight || 120;
      if (useWindowScroll) {
        headerTopRef.current = headerWrapperRef.current.getBoundingClientRect().top + window.scrollY;
      } else {
        headerTopRef.current = headerWrapperRef.current.offsetTop;
      }
    }

    if (wrappersRef.current[0]) {
      stableCardHeightRef.current = wrappersRef.current[0].offsetHeight || 300;
    }

    if (innerRef.current) {
      const innerRect = innerRef.current.getBoundingClientRect();
      const innerDocTop = useWindowScroll
        ? innerRect.top + window.scrollY
        : innerRef.current.offsetTop;

      cardTopsRef.current = wrappersRef.current.map(wrapper => {
        if (!wrapper) return 0;
        return innerDocTop + wrapper.offsetTop;
      });

      const totalCards = wrappersRef.current.length;
      if (totalCards > 0) {
        const headerElHeight = stableHeaderHeightRef.current;
        const cardElHeight = stableCardHeightRef.current;
        const totalBlockHeight = headerElHeight + 24 + cardElHeight;
        const autoCenterTop = Math.max(70, (containerHeight - totalBlockHeight) / 2);

        const headerPositionPx = headerPosition === 'center'
          ? autoCenterTop
          : parsePercentage(headerPosition, containerHeight);

        const stackPositionPx = stackPosition === 'center'
          ? (headerPositionPx + headerElHeight + 24)
          : parsePercentage(stackPosition, containerHeight);

        const rawSpacer = containerHeight - (stackPositionPx + (totalCards - 1) * itemStackDistance + cardElHeight);
        const neededSpacer = Math.max(0, rawSpacer - 45);

        const endElement = innerRef.current.querySelector('.scroll-stack-end') as HTMLElement;
        if (endElement) {
          endElement.style.height = `${Math.ceil(neededSpacer)}px`;
        }
      }
    }
  }, [headerPosition, itemStackDistance, parsePercentage, stackPosition, useWindowScroll]);

  const updateTransforms = useCallback(() => {
    if (!cardsRef.current.length || !cardTopsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const headerElHeight = stableHeaderHeightRef.current;
    const cardElHeight = stableCardHeightRef.current;
    const totalBlockHeight = headerElHeight + 24 + cardElHeight;
    const autoCenterTop = Math.max(70, (containerHeight - totalBlockHeight) / 2);

    const headerPositionPx = headerPosition === 'center'
      ? autoCenterTop
      : parsePercentage(headerPosition, containerHeight);

    const stackPositionPx = stackPosition === 'center'
      ? (headerPositionPx + headerElHeight + 24)
      : parsePercentage(stackPosition, containerHeight);

    const totalCards = cardsRef.current.length;
    if (totalCards === 0) {
      isUpdatingRef.current = false;
      return;
    }

    const lastCardTop = cardTopsRef.current[totalCards - 1] || 0;
    const pinEnd = lastCardTop - stackPositionPx - (totalCards - 1) * itemStackDistance;

    if (headerInnerRef.current) {
      const headerTop = headerTopRef.current || 0;
      const headerPinStart = headerTop - headerPositionPx;

      let headerY = 0;
      let headerOpacity = 1;

      if (scrollTop < headerPinStart) {
        headerY = 0;
        const entrance = calculateProgress(scrollTop, headerPinStart - 300, headerPinStart);
        headerOpacity = Math.min(1, Math.max(0, Math.pow(entrance, 1.2)));
      } else if (scrollTop >= headerPinStart && scrollTop <= pinEnd) {
        headerY = scrollTop - headerTop + headerPositionPx;
        headerOpacity = 1;
      } else if (scrollTop > pinEnd) {
        headerY = pinEnd - headerTop + headerPositionPx;
        headerOpacity = 1;
      }

      const roundedHeaderY = Math.round(headerY * 100) / 100;
      headerInnerRef.current.style.transform = `translate3d(0, ${roundedHeaderY}px, 0)`;
      headerInnerRef.current.style.opacity = `${headerOpacity}`;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] || 0;
      const pinOffset = stackPositionPx + itemStackDistance * i;
      const pinStart = cardTop - pinOffset;

      let translateY = 0;
      if (scrollTop < pinStart) {
        translateY = 0;
      } else if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + pinOffset;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + pinOffset;
      }

      let scaleReduction = 0;
      for (let j = i + 1; j < totalCards; j++) {
        const jCardTop = cardTopsRef.current[j] || 0;
        const jPinStart = jCardTop - (stackPositionPx + itemStackDistance * j);
        const jProgress = calculateProgress(scrollTop, jPinStart - itemDistance * 0.75, jPinStart);
        scaleReduction += jProgress * itemScale;
      }

      const scale = Math.max(0.68, 1 - scaleReduction);
      const entranceProgress = calculateProgress(scrollTop, pinStart - itemDistance * 1.5, pinStart);
      const opacity = scrollTop < pinStart ? Math.min(1, Math.max(0, Math.pow(entranceProgress, 1.2))) : 1;

      const roundedY = Math.round(translateY * 100) / 100;
      const roundedScale = Math.round(scale * 1000) / 1000;

      card.style.transform = `translate3d(0, ${roundedY}px, 0) scale(${roundedScale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${10 + i}`;

      if (i === totalCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    calculateProgress,
    getScrollData,
    headerPosition,
    itemDistance,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    stackPosition,
    useWindowScroll
  ]);

  const handleScroll = useCallback(() => {
    updateTransforms();
  }, [updateTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = useWindowScroll ? window : scrollerRef.current;
    if (!scroller) return null;

    const lenis = new Lenis({
      ...(useWindowScroll
        ? {}
        : {
          wrapper: scrollerRef.current!,
          content: scrollerRef.current!.querySelector('.scroll-stack-inner') as HTMLElement,
        }),
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const container = useWindowScroll ? document : scroller!;
    const wrappers = Array.from(container.querySelectorAll('.scroll-stack-card-wrapper')) as HTMLElement[];
    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];

    wrappersRef.current = wrappers;
    cardsRef.current = cards;

    wrappers.forEach((wrapper, i) => {
      if (i < wrappers.length - 1) {
        wrapper.style.marginBottom = `${itemDistance}px`;
      }
    });

    const syncCardSizes = () => {
      if (cards.length > 0) {
        cards.forEach(card => {
          card.style.minHeight = '';
        });
      }
    };

    syncCardSizes();
    measurePositions();
    setupLenis();
    updateTransforms();

    const handleResize = () => {
      syncCardSizes();
      measurePositions();
      updateTransforms();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      wrappersRef.current = [];
      cardsRef.current = [];
      cardTopsRef.current = [];
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    measurePositions,
    setupLenis,
    updateTransforms
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      {header && (
        <div ref={headerWrapperRef} className="scroll-stack-header-outer w-full pb-4 mb-6 flex justify-start">
          <div ref={headerInnerRef} className="scroll-stack-header-inner w-full">
            <div className="scroll-stack-header-float">
              {header}
            </div>
          </div>
        </div>
      )}
      <div className="scroll-stack-inner" ref={innerRef}>
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;

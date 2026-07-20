"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  useBlur?: boolean;
  className?: string;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  useBlur = false,
  className,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<HTMLElement[]>([]);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      lines.current = [];
      elementRefs.current = [];

      let elements: HTMLElement[] = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRefs.current.push(element);

        const split = new SplitText(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          lineThreshold: 0.1,
        });

        splitRefs.current.push(split);

        // Fix descender clipping and allow sparkles to overflow
        split.lines.forEach((line) => {
          const lineEl = line as HTMLElement;
          if (useBlur) {
            lineEl.style.overflow = "visible";
          }
          lineEl.style.paddingBottom = "0.2em";
          lineEl.style.marginBottom = "-0.2em";
          if (lineEl.parentElement && lineEl.parentElement.classList.contains("line++")) {
            if (useBlur) {
              (lineEl.parentElement as HTMLElement).style.overflow = "visible";
            }
            (lineEl.parentElement as HTMLElement).style.paddingBottom = "0.2em";
            (lineEl.parentElement as HTMLElement).style.marginBottom = "-0.2em";
          }
        });

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          element.style.textIndent = "0";
        }

        lines.current.push(...(split.lines as HTMLElement[]));
      });

      if (useBlur) {
        gsap.set(lines.current, { y: 28, opacity: 0, filter: "blur(16px)" });
      } else {
        gsap.set(lines.current, { y: "105%", opacity: 1, filter: "none" });
      }

      const animationProps = useBlur
        ? {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.25,
            ease: "power3.out",
            delay: delay,
          }
        : {
            y: "0%",
            opacity: 1,
            filter: "none",
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            delay: delay,
          };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement>; className?: string }>, {
      ref: containerRef as unknown as React.Ref<HTMLElement>,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true" className={className}>
      {children}
    </div>
  );
}

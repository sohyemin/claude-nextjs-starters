import type { Metadata } from "next";
import { Section } from "@/components/examples/section";
import { CodeBlock } from "@/components/examples/code-block";
import { LocalStorageDemo } from "@/components/examples/hooks/local-storage-demo";
import { DebounceDemo } from "@/components/examples/hooks/debounce-demo";
import { ToggleDemo } from "@/components/examples/hooks/toggle-demo";
import { CounterDemo } from "@/components/examples/hooks/counter-demo";
import { CopyClipboardDemo } from "@/components/examples/hooks/copy-clipboard-demo";
import { WindowSizeDemo } from "@/components/examples/hooks/window-size-demo";
import { MediaQueryDemo } from "@/components/examples/hooks/media-query-demo";
import { IntervalDemo } from "@/components/examples/hooks/interval-demo";

export const metadata: Metadata = {
  title: "usehooks-ts 예제",
};

export default function HooksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">usehooks-ts 예제</h1>
        <p className="text-lg text-muted-foreground">
          자주 사용하는 커스텀 훅들을 인터랙티브 데모로 확인하세요.
        </p>
      </div>

      <Section
        title="useLocalStorage"
        description="localStorage에 값을 저장하고 읽는 훅. 새로고침 후에도 값이 유지됩니다."
      >
        <LocalStorageDemo />
        <CodeBlock
          code={`const [value, setValue] = useLocalStorage("key", "기본값");`}
          language="tsx"
        />
      </Section>

      <Section
        title="useDebounceValue"
        description="입력이 멈춘 후 일정 시간이 지났을 때만 값을 업데이트합니다. API 검색 최적화에 유용합니다."
      >
        <DebounceDemo />
        <CodeBlock
          code={`const [input, setInput] = useState("");
const [debouncedValue] = useDebounceValue(input, 500);

// debouncedValue가 변경될 때만 API 호출
useEffect(() => {
  if (debouncedValue) fetchResults(debouncedValue);
}, [debouncedValue]);`}
          language="tsx"
        />
      </Section>

      <Section
        title="useToggle"
        description="boolean 상태를 토글하는 훅. toggle(), setValue() 함수를 제공합니다."
      >
        <ToggleDemo />
        <CodeBlock
          code={`const [isOn, toggle, setIsOn] = useToggle(false);`}
          language="tsx"
        />
      </Section>

      <Section
        title="useCounter"
        description="증가/감소/리셋/직접 설정이 가능한 카운터 훅입니다."
      >
        <CounterDemo />
        <CodeBlock
          code={`const { count, increment, decrement, reset, setCount } = useCounter(0);`}
          language="tsx"
        />
      </Section>

      <Section
        title="useCopyToClipboard"
        description="클립보드에 텍스트를 복사하고 마지막 복사한 값을 반환하는 훅입니다."
      >
        <CopyClipboardDemo />
        <CodeBlock
          code={`const [copiedText, copy] = useCopyToClipboard();

const handleCopy = () => {
  copy("복사할 텍스트");
};`}
          language="tsx"
        />
      </Section>

      <Section
        title="useWindowSize"
        description="브라우저 창의 너비와 높이를 실시간으로 추적합니다."
      >
        <WindowSizeDemo />
        <CodeBlock
          code={`const { width, height } = useWindowSize();`}
          language="tsx"
        />
      </Section>

      <Section
        title="useMediaQuery"
        description="CSS 미디어 쿼리 결과를 React state로 반환합니다."
      >
        <MediaQueryDemo />
        <CodeBlock
          code={`const isDesktop = useMediaQuery("(min-width: 1024px)");
const isDark = useMediaQuery("(prefers-color-scheme: dark)");`}
          language="tsx"
        />
      </Section>

      <Section
        title="useInterval"
        description="delay를 null로 설정하면 인터벌이 정지됩니다. setInterval을 안전하게 래핑합니다."
      >
        <IntervalDemo />
        <CodeBlock
          code={`const [running, setRunning] = useState(false);

useInterval(
  () => setCount((c) => c + 1),
  running ? 1000 : null  // null이면 정지
);`}
          language="tsx"
        />
      </Section>
    </div>
  );
}

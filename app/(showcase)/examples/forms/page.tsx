import type { Metadata } from "next";
import { Section } from "@/components/examples/section";
import { CodeBlock } from "@/components/examples/code-block";
import { BasicFieldsForm } from "@/components/examples/basic-fields-form";
import { MultiStepForm } from "@/components/examples/multi-step-form";

export const metadata: Metadata = {
  title: "폼 예제",
};

const basicCode = `const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.enum(["kr", "us", "jp"]),
  agreeTerms: z.boolean().refine((v) => v === true),
});

const { register, handleSubmit, setValue, formState } = useForm({
  resolver: zodResolver(schema),
});`;

const multiStepCode = `const [step, setStep] = useState(0);

const handleNext = async () => {
  const fields = step === 0
    ? ["name", "email", "password", "confirmPassword"]
    : ["company", "role", "bio"];

  const valid = await trigger(fields);
  if (valid) setStep((s) => s + 1);
};`;

export default function FormsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">폼 예제</h1>
        <p className="text-lg text-muted-foreground">
          react-hook-form + Zod를 활용한 폼 유효성 검사 패턴
        </p>
      </div>

      <Section
        title="기본 필드 폼"
        description="Input, Select, RadioGroup, Checkbox, Switch 등 다양한 필드를 Zod로 검증하는 폼입니다."
      >
        <BasicFieldsForm />
        <CodeBlock code={basicCode} language="tsx" />
      </Section>

      <Section
        title="다단계 폼"
        description="trigger() API를 활용해 스텝별로 유효성을 검사하며 진행하는 멀티 스텝 폼입니다."
      >
        <MultiStepForm />
        <CodeBlock code={multiStepCode} language="tsx" />
      </Section>
    </div>
  );
}

"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
})

type FormValues = z.infer<typeof formSchema>

const Search = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const router = useRouter()

  function handleSearch({ title }: FormValues) {
    router.push(`/barbershops?title=${title}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}

export default Search

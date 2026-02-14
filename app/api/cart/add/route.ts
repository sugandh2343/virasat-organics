
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // const supabase = await createClient()

    // Get current user
    // const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    // if (authError || !user) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   )
    // }

    const body = await request.json()
    const { product_id, quantity, variant_id } = body

    if (!product_id || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if item already in cart
    // const { data: existingItem } = await supabase
    //   .from('cart_items')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .eq('product_id', product_id)
    //   .eq('variant_id', variant_id || null)
    //   .single()

    // if (existingItem) {
    //   // Update quantity
    //   const { error } = await supabase
    //     .from('cart_items')
    //     .update({ quantity: existingItem.quantity + quantity })
    //     .eq('id', existingItem.id)

    //   if (error) throw error
    // } else {
    //   // Add new item
    //   const { error } = await supabase
    //     .from('cart_items')
    //     .insert({
    //       user_id: user.id,
    //       product_id,
    //       quantity,
    //       variant_id: variant_id || null,
    //     })

    //   if (error) throw error
    // }

    return NextResponse.json(
      { success: true, message: 'Item added to cart' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

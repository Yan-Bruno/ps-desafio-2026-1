<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ArticlesController extends Controller
{   
    protected $articles;

    public function __construct(Articles $articles)
    {
        $this->articles = $articles;
    }

    public function index(): JsonResponse
    {
        $articles = $this->articles->with('category')->get();
        return response()->json($articles, Response::HTTP_OK);
    }

    public function store(StoreArticlesRequest $request): JsonResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = url('storage/' . $path);
        }
        $articles = $this->articles->create($data);
        $id = $articles->id;
        $articles_category = $this->articles->with('category')->findOrFail($id);
        return response()->json($articles_category, Response::HTTP_CREATED);
    }

    public function show($id): JsonResponse
    {
        $articles = $this->articles->with('category')->findOrFail($id);
        return response()->json($articles, Response::HTTP_OK);
    }

    public function update(UpdateArticlesRequest $request, $id): JsonResponse
    {
        $articles = $this->articles->with('category')->findOrFail($id);
        $data = $request->validated();
        
        if ($request->hasFile('image')) {
            try {
                $image_name = explode('articles/', $articles['image']);
                Storage::disk('public')->delete('articles/' . $image_name[1]);
            } catch (\Throwable $e) {
                // Ignora erro se não conseguir deletar
            } finally {
                $path = $request->file('image')->store('articles', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }

        $articles->update($data);
        return response()->json($articles, Response::HTTP_OK);
    }

    public function destroy($id): JsonResponse
    {
        $articles = $this->articles->findOrFail($id);
        $articles->delete();
        return response()->json(['Message' => 'artigo esportivo deletado']);
    }

    // MÉTODO DE COMPRA - DIMINUI O ESTOQUE
    public function buy($id): JsonResponse
    {
        try {
            $articles = $this->articles->findOrFail($id);
            
            if ($articles->amount <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Produto esgotado',
                    'amount' => $articles->amount
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $articles->amount--;
            $articles->save();
            
            $articles->load('category');
            
            return response()->json([
                'success' => true,
                'message' => 'Compra realizada com sucesso',
                'amount' => $articles->amount,
                'product' => [
                    'id' => $articles->id,
                    'name' => $articles->name,
                    'amount' => $articles->amount
                ]
            ], Response::HTTP_OK);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao processar compra: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Nette\Utils\Json;
use PHPUnit\Event\Code\Throwable;
use Symfony\Component\HttpFoundation\Response;

class ArticlesController extends Controller
{   protected $articles;

    public function __construct(Articles $articles)
    {
        $this->articles = $articles;
    }


    public function index(): JsonResponse
     {
         $articles = $this->articles->with('category')->get();
         return response()->json($articles, Response::HTTP_OK);
     }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticlesRequest $request):JsonResponse
     {
        $data = $request->validated();
        if($request->hasFile('image')){
            $path = $request->file('image')->store('articles','public');
            $data['image'] = url('storage/'.$path);
        }
        $articles = $this->articles->create($data);
        $id = $articles->id;
        $articles_category = $this->articles->with('category')->findOrFail($id);
        return response()->json($articles_category, Response::HTTP_CREATED);
 }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $articles = $this->articles->with('category')->findOrFail($id);
        return response()->json($articles, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticlesRequest $request, $id): JsonResponse
    {
        $articles = $this->articles->with('category')->findOrFail($id);
        $data = $request->validated();
        
        if($request->hasFile('image')){
            try{
              $image_name = explode ('articles/', $articles['image']); 
              Storage::disk('public')->delete('articles/'.$image_name[1]);
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('articles','public');
                $data['image'] = url('storage/'.$path); 
            }
        }

        $articles->update($data);
        return response()->json($articles, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $articles = $this->articles->findOrFail($id);
        $articles -> delete();
        return response()->json(['Message' => 'artigo esportivo deletado']);
    }
}

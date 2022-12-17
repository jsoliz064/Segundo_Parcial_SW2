<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    //
    public function all()
    {
        $files = File::all();
        return $files;
    }
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => "Faltan Parametros",
                    'errors' => $validator->errors()->all()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
        $id = $request->file_id;
        $file = File::find($id);
        if ($file == null) {
            return response()->json(['message' => "file con id: {$id} no encontrado"], Response::HTTP_BAD_REQUEST);
        }
        return $file;
    }
    public function getFiles(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => "Faltan Parametros",
                    'errors' => $validator->errors()->all()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
        $user_id = $request->user_id;
        $files = File::where('user_id', $user_id)->get();
        return $files;
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'archivo' => 'required|file',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => "Faltan Parametros",
                    'errors' => $validator->errors()->all()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
        $file = $request->file('archivo');
        $dir = "documents/";
        $image = $file;
        $imageName = "file" . uniqid() . "." . $file->extension();
        if (!Storage::disk('public')->exists($dir)) {
            Storage::disk('public')->makeDirectory($dir);
        }
        Storage::disk('public')->put($dir . $imageName, file_get_contents($image));
        $url = "/storage/documents/${imageName}";

        $user_id = $request->user_id;
        $file = File::create([
            'path' => $url,
            'user_id' => $user_id,
        ]);

        return response()->json($file, Response::HTTP_OK);
    }
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => "Faltan Parametros",
                    'errors' => $validator->errors()->all()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $id = $request->file_id;
        $file = File::find($id);
        if ($file == null) {
            return response()->json(['message' => "file con id: no encontrado"], Response::HTTP_BAD_REQUEST);
        }
        if ($file->path) {
            $ruta = "public" . $file->path;
            if (file_exists("../" . $ruta)) {
                unlink("../" . $ruta);
            }
        }
        $file->delete();
        return response()->json(['message' => "FILE ELIMINADO EXITOSAMENTE"], Response::HTTP_OK);
    }
}
